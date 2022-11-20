import { Types } from 'mongoose';

export const moviesStub = () => {
  /**
     *  @
  title: string;

  description: string;

  tags: Types.ObjectId[];

  trailer: string;


  movieLengthInMinutes: number;


  yearOfRelease: number;


  coverPicture: string;


  rating: number;
  keywords: string[];
     */
  return {
    title: 'The Godfather',
    description:
      'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    tags: [new Types.ObjectId('5f9f1b0b0b1b0c0b0b0b0b0c')],
    trailer: 'https://www.youtube.com/watch?v=sY1S34973zA',
    movieLengthInMinutes: 175,
    yearOfRelease: 1972,
    coverPicture:
      'https://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg',
    keywords: [
      'mafia',
      'italy',
      'crime',
      'violence',
      'gangster',
      'cult film',
      'organized crime',
      'crime family',
      'father son relationship',
      'based on novel or book',
    ],
  };
};
