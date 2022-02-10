export interface RadioPlayerProps {
  src: string;
}

export function AudioPlayer(props: RadioPlayerProps) {
  return (<audio className='block w-48'  src={props.src} autoPlay={true} controls={true}/>);
}
