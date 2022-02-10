export interface RadioPlayerProps {
  src: string;
}

export function AudioPlayer(props: RadioPlayerProps) {
  return (<audio src={props.src} autoPlay={true} controls={true}/>);
}
