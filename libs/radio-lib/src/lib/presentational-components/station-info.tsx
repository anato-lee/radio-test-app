import { IStation } from '../interfaces';

export interface IStationInfo {
  data: IStation;
}

export function StationInfo({ data: { name, imgUrl, description, popularity, reliability, tags } }: IStationInfo) {
  return (<article>
    <img src={ imgUrl } alt={ name }/>
    <header>{ name }</header>

    <details>
      <summary>Details</summary>
      <span>{ description }</span>
    </details>

    <footer>
      <dl>
        <dt>Popularity</dt>
        <dd>{ popularity }</dd>

        <dt>Reliability</dt>
        <dd>{ reliability }</dd>

        <dt>Tags</dt>
        <dd>{ tags.map(t => (<span>{ t }</span>)) }</dd>
      </dl>
    </footer>
  </article>);
}
