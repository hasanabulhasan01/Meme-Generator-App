import MemeMaker from './meme-maker'

export default async function SelectedMeme(props){
    const id = props.params.id
    console.log(id, "id---")
    console.log(props.params.id,'props')
    const res = await fetch(`https://api.imgflip.com/get_memes`)
    const data = await res.json()
    const response = data.data.memes.filter((e) => e.id === id)

    console.log(response, 'selected meme--------------------')


    return <MemeMaker response={response} />
}