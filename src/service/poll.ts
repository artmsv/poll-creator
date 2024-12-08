const API_BASE_URL = 'https://6626a09d052332d553238268.mockapi.io/api/polls-artem';

export interface Poll {
  question: string;
  options: Array<string>;
}

export interface PollWithMetadata extends Poll {
  id: string;
  createdAt: string;
}

export async function getAllPolls(): Promise<Array<PollWithMetadata>> {
  const request = new Request(API_BASE_URL);
  return await fetchData<Array<PollWithMetadata>>(request);
}

export async function createNewPoll(pollData: Poll) {
  const request = new Request(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pollData),
  });
  return await fetchData(request);
}

export async function getPollById(pollId: string): Promise<Poll> {
  const request = new Request(`${API_BASE_URL}/${pollId}`);
  return await fetchData<Poll>(request);
}

export async function deletePoll(pollId: string) {
  const request = new Request(`${API_BASE_URL}/${pollId}`, {
    method: 'DELETE',
  });
  return await fetchData(request);
}

export async function fetchData<T>(request: Request): Promise<T> {
  try {
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error while fetching request:', error, request);
    throw error;
  }
}
