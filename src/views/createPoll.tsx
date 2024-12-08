import React, { useState, useRef, useId } from 'react';
import * as pollService from '../service/poll.ts';
import { Button } from '../components/button.tsx';

// we added "id" to options for react optimizations
interface Poll extends Omit<pollService.Poll, 'options'> {
  options: Array<{ id: number; text: string }>;
}

function cleanPollData(): Poll {
  return {
    question: '',
    options: [],
  };
}

export interface TextInputProps {
  label: string;
  placeholder: string;
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}
export function TextInput({ label, value, onChange, placeholder, inputRef, disabled }: TextInputProps) {
  const id = useId();

  return (
    <div className="mb-7">
      <label className="block mb-4 font-medium text-lg" htmlFor={id}>
        {label}
      </label>
      <input
        className="block w-full h-8 border-b-[1px] border-tertiary"
        type="text"
        id={id}
        ref={inputRef}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}

export interface OptionInputProps {
  label: string;
  placeholder: string;
  disabled: boolean;
  options: Poll['options'];
  onAdd: (option: string, clearInputCb: () => void) => void;
  onRemove: (id: number) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}
export function OptionInput({ options, onAdd, onRemove, inputRef, label, placeholder, disabled }: OptionInputProps) {
  const [optionValue, setOptionValue] = useState('');
  const id = useId();

  function handleAddOption() {
    onAdd(optionValue.trim(), () => setOptionValue(''));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission when Enter key is pressed
      handleAddOption();
    }
  }

  return (
    <div className="mb-7">
      <label className="block mb-4 font-medium text-lg" htmlFor={id}>
        {label}
      </label>
      <div className="flex gap-1">
        <input
          className="flex-grow h-8 border-b-[1px] border-tertiary"
          type="text"
          value={optionValue}
          onChange={e => setOptionValue(e.target.value)}
          onKeyDown={handleKeyDown}
          id={id}
          ref={inputRef}
          placeholder={placeholder}
          disabled={disabled}
        />
        <button
          className="text-3xl leading-none text-white bg-primary rounded-full w-[1.1em] active:bg-[#227A66]"
          type="button"
          onClick={handleAddOption}
          disabled={disabled}
        >
          +
        </button>
      </div>
      {options.length > 0 && (
        <div className="border border-tertiary mt-4">
          {options.map(option => (
            <div key={option.id} className="flex gap-4 w-full border-b border-tertiary last:border-none p-3">
              <p className="flex-1 font-medium text-xl overflow-hidden text-ellipsis">{option.text}</p>
              <button
                type="button"
                onClick={() => onRemove(option.id)}
                className="font-medium text-xs text-primary"
                disabled={disabled}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function CreatePollForm() {
  const [pollData, setPollData] = useState<Poll>(() => cleanPollData());
  const [error, setError] = useState('');
  const [isPending, setPending] = useState(false);

  const questionInputRef = useRef<HTMLInputElement>(null);
  const optionInputRef = useRef<HTMLInputElement>(null);

  function handleQuestionChange(question: string) {
    setPollData(prev => ({ ...prev, question }));
  }

  function handleAddOption(optionText: string, clearInput: () => void) {
    setError('');
    if (optionText.length === 0) return;
    if (pollData.options.some(option => option.text === optionText)) {
      setError('Option already exists.');
      optionInputRef.current?.focus();
      return;
    }
    setPollData(prev => ({
      ...prev,
      options: [...prev.options, { id: Date.now(), text: optionText }],
    }));
    clearInput();
  }

  function handleRemoveOption(id: number) {
    setError('');
    setPollData(prev => ({
      ...prev,
      options: prev.options.filter(option => option.id !== id),
    }));
  }

  function handleSubmit() {
    setError('');
    // checking for empty question
    if (pollData.question.length === 0) {
      setError('Please provide a poll question.');
      questionInputRef.current?.focus();
      return;
    }
    // checking for min options
    if (pollData.options.length < 2) {
      setError('Please provide at least two poll options.');
      optionInputRef.current?.focus();
      return;
    }
    // preparing payload for API call
    const payload: pollService.Poll = {
      question: pollData.question,
      options: pollData.options.map(option => option.text),
    };
    setPending(true);
    pollService
      .createNewPoll(payload)
      .then(
        () => {
          setPollData(cleanPollData());
          alert('Poll was created successfully!');
          questionInputRef.current?.focus();
        },
        () => {
          alert('Failed to create poll.');
        },
      )
      .finally(() => {
        setPending(false);
      });
  }

  return (
    <div className="max-w-[448px] w-full border border-tertiary m-auto shadow-md shadow-[#22252526] mt-36">
      <form action={handleSubmit}>
        <div className="p-5 pb-0">
          <h1 className="text-xl font-semibold mb-7">Create Your Poll</h1>
          <TextInput
            label="Poll Question"
            placeholder="Ex: What should we have for lunch tomorrow?"
            value={pollData.question}
            onChange={handleQuestionChange}
            inputRef={questionInputRef}
            disabled={isPending}
          />
          <OptionInput
            label="Poll Options"
            placeholder="Ex: Pizza"
            options={pollData.options}
            onAdd={handleAddOption}
            onRemove={handleRemoveOption}
            inputRef={optionInputRef}
            disabled={isPending}
          />
          {error && <div className="text-red-500 text-right text-sm">{error}</div>}
        </div>
        <div className="flex justify-end p-4 border-t-[1px] mt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Loading...' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
}
