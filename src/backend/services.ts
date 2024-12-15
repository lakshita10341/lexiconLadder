import words from '../assets/words.json'

const API_LINK = "https://api.datamuse.com/words?rel_trg=";

async function getRelatedWords(word: string): Promise<any[]> {

	let data: any;

	try {
		const link = `${API_LINK}${encodeURIComponent(word)}`;
		console.log(link);

		const request = new Request(link , {
			method: 'GET',
			headers: {
				Accept : 'application/json',
			},
		});

		const res = await fetch(request);
		data = await res.json();
		
        return data
            .slice(0, 10)
            .map((item: { word: string }) => item.word);
    } catch (error) {
        console.error('Error fetching related words:', error);
        return [];
    }
}

function getRandomWord(): string{
	const wordsArray = Object.values(words);
	const randomIndex = Math.floor(Math.random() * wordsArray.length);
	return wordsArray[randomIndex];
}


export { getRelatedWords , getRandomWord };