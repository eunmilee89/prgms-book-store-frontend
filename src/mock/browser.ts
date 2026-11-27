import { setupWorker } from 'msw/browser';
import { addReview, reviewForMain, reviewsById } from './review';
import { bestBooks } from './books';
import { banners } from './banner';

const handlers = [reviewsById, addReview, reviewForMain, banners];

export const worker = setupWorker(...handlers);
