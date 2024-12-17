import type { Context } from '@devvit/public-api';
import { Devvit } from '@devvit/public-api';
import { Service } from "./service/Service.js";
import { Router } from './posts/router/Router.js';
import { PixelText } from './components/PixelText.js';
import { LoadingState } from './components/LoadingState.js';
import { newPinnedPost } from './actions/CreateNewGamePost.js';
import { addScore } from './actions/AddScore.js';

Devvit.configure({
  redis: true,
  redditAPI: true,
  media: true
});

Devvit.addCustomPostType({
  name: 'Lexicon-Link',
  description: 'Guess words and Enjoy!',
  height: 'tall',
  render: Router
});

Devvit.addMenuItem(addScore);

Devvit.addMenuItem(newPinnedPost);

export default Devvit;
