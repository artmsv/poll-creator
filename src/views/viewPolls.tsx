import { useState, useEffect } from 'react';
import * as pollService from '../service/poll.ts';
import { Button } from '../components/button.tsx';

export function ViewPolls() {
  const [polls, setPolls] = useState<Array<pollService.PollWithMetadata>>([]);
  const [selectedPollIndex, setSelectedPollIndex] = useState<number | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [isPending, setPending] = useState(false);
  const [pollsLoadError, setPollsLoadError] = useState<string>('');
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    pollService
      .getAllPolls()
      .then(setPolls, error => setPollsLoadError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDeletePoll = (idx: number) => () => {
    setDeleteError('');
    const pollId = polls[idx]?.id;
    if (!pollId) return;
    setPending(true);
    pollService
      .deletePoll(pollId)
      .then(
        () => {
          setPolls(polls.filter(poll => poll.id !== pollId));
          setSelectedPollIndex(null);
        },
        () => {
          setDeleteError('An error occurred.');
        },
      )
      .finally(() => setPending(false));
  };

  const handleSelectPoll = (idx: number) => () => {
    setDeleteError('');
    setSelectedPollIndex(idx);
  };

  if (isLoading) {
    return (
      <div className="flex-grow flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }
  if (pollsLoadError) {
    return (
      <div className="flex-grow flex justify-center items-center">
        <p>Error: {pollsLoadError}</p>
      </div>
    );
  }
  if (polls.length === 0) {
    return (
      <div className="flex-grow flex justify-center items-center">
        <p>No polls found.</p>
      </div>
    );
  }

  return (
    <div className="p-10 flex gap-6 items-start">
      <div className="w-full flex-grow max-w-[400px] border border-tertiary">
        {polls.map((poll, idx) => (
          <button
            key={poll.id}
            type="button"
            className={`border-b border-tertiary last:border-none p-3 text-left w-full hover:bg-slate-100 ${
              selectedPollIndex == idx ? 'bg-[#F8F8F8]' : 'bg-white'
            }`}
            onClick={handleSelectPoll(idx)}
            disabled={isPending}
          >
            <h2 className="block text-xl font-medium text-ellipsis text-nowrap overflow-hidden">{poll.question}</h2>
            <p className="text-base font-normal text-[#818181]">
              {new Intl.DateTimeFormat('en-US').format(new Date(poll.createdAt))}
            </p>
          </button>
        ))}
      </div>

      {selectedPollIndex !== null ? (
        <PollCard poll={polls[selectedPollIndex]}>
          {deleteError ? <div className="text-red-500 text-right text-sm">{deleteError}</div> : null}
          <div className="flex justify-end mt-5">
            <Button type="button" onClick={handleDeletePoll(selectedPollIndex)} disabled={isPending}>
              {isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </PollCard>
      ) : null}
    </div>
  );
}

interface PollCardProps {
  poll: pollService.PollWithMetadata;
}
export function PollCard({ poll, children }: React.PropsWithChildren<PollCardProps>) {
  return (
    <div className="max-w-[450px] w-full border border-tertiary rounded p-7">
      <h2 className="text-xl font-medium mb-5">{poll.question}</h2>
      <p className="text-base font-medium text-[#818181] mb-[18px]">Options:</p>
      <ul className="list-disc">
        {poll.options.map((option, idx) => (
          <li className="ml-4 text-base font-medium break-words" key={idx}>
            {option}
          </li>
        ))}
      </ul>
      {children}
    </div>
  );
}
