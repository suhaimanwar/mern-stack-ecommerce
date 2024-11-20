import { unlinkSync } from 'fs';
import { join } from 'path';
import { getRootDir } from '../../fileUtils.js';

export const singleFileRemover = (filePath) => {

	try {
		unlinkSync(join(getRootDir(), filePath));
	} catch (error) {
		console.error(error);
	}
};