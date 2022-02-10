import { IStation } from '../interfaces';

export function StationInfo(props: IStation) {
  return (<article>
    <img src={ props.imgUrl } alt={ props.name }/>
    <header>{ props.name }</header>

    <details>
      <summary>Details</summary>
      <span>{ props.description }</span>
    </details>

    <footer>
      <dl>
        <dt>Popularity</dt>
        <dd>{ props.popularity }</dd>

        <dt>Reliability</dt>
        <dd>{ props.reliability }</dd>

        <dt>Tags</dt>
        <dd>{ props.tags }</dd>
      </dl>
    </footer>
  </article>);
}
