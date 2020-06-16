import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { fetchShow as mockFetchShow } from './api/fetchShow';
// console.log("mockFetchShow- BEFORE MOCK", mockFetchShow);

const episodesData = {
  id: 2993,
  name: 'Stranger Things',
  runtime: 60,
  image: {
    medium:
      'http://static.tvmaze.com/uploads/images/medium_portrait/200/501942.jpg',
    original:
      'http://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg',
  },
  summary:
    "<p>A love letter to the '80s classics that captivated a generation, <b>Stranger Things</b> is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.</p>",
  _embedded: {
    episodes: [
      {
        id: 553946,
        name: 'Chapter One: The Vanishing of Will Byers',
        season: 1,
        number: 1,
        runtime: 60,
        image: {
          medium:
            'http://static.tvmaze.com/uploads/images/medium_landscape/67/168918.jpg',
          original:
            'http://static.tvmaze.com/uploads/images/original_untouched/67/168918.jpg',
        },
      },
      {
        id: 909340,
        name: 'Chapter One: MADMAX',
        season: 2,
        number: 1,
        runtime: 60,
        image: {
          medium:
            'http://static.tvmaze.com/uploads/images/medium_landscape/132/331976.jpg',
          original:
            'http://static.tvmaze.com/uploads/images/original_untouched/132/331976.jpg',
        },
      },
      {
        id: 1576469,
        name: 'Chapter One: Suzie, Do You Copy?',
        season: 3,
        number: 1,
        runtime: 51,
        image: {
          medium:
            'http://static.tvmaze.com/uploads/images/medium_landscape/204/510098.jpg',
          original:
            'http://static.tvmaze.com/uploads/images/original_untouched/204/510098.jpg',
        },
      },
    ],
  },
};

//mock the fetchShow function
jest.mock('./api/fetchShow');
// console.log("mockFetchShow- AFTER", mockFetchShow);

test('renders fetchShow when the dropdown is clicked', async () => {
  mockFetchShow.mockResolvedValueOnce(episodesData);
  console.log(mockFetchShow);
  const {
    getAllByText,
    getByText,
  } = render(<App />);

  await waitFor(() => {
    getByText(/select a season/i);
  });

  userEvent.click(getByText(/select a season/i));

  expect(getAllByText(/season/i)).toHaveLength(4);
  //  debug();
});
