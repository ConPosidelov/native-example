import axios from 'axios';


const translateApi = async ({ q, sourceLang = 'en', targetLang = 'ru' }) => {
    const options = {
        method: 'GET',
        url: 'https://translated-mymemory---translation-memory.p.rapidapi.com/get',
        params: { langpair: `${sourceLang}|${targetLang}`, q, mt: '1', onlyprivate: '0', de: 'a@b.c' },
        headers: {
            'X-RapidAPI-Key': '',
            'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
        }
    };
    try {
        const res = await axios.request(options)
        if(res) {
            return res.data.matches[0].translation
        } else {
            return null
        }
    } catch {
        console.error(error)
    }
}

export { translateApi };
