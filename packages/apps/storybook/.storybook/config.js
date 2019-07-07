import { addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming';

addParameters({
	options: {
		theme: create({
			base: 'light',
			brandTitle: 'iNat components',
			url: 'https://github.com/benkeen/inat-components'
		})
	},
	readme: {
		codeTheme: 'github'
	}
});

function loadStories () {
	require('../src/stories');
}

configure(loadStories, module);
