import { IStation } from '../interfaces';

export interface IStationInfo {
  data: IStation;
}

export function StationInfo({ data: { name, imgUrl, description, popularity, reliability, tags, id } }: IStationInfo) {
  return (<article className='grid grid-cols-5 gap-2'>
    <img className='w-16 h-16 rounded-md col-span-1' src={ imgUrl } alt={ name }/>

    <h3 className='col-span-4 p-2 border-box text-2xl font-semibold'>{ name }</h3>

    <p className='col-span-5'>{ description }</p>

    <footer className='col-span-5 text-sm text-slate-700'>
      <dl className='grid grid-cols-2'>
        <div className='flex'>
          <dt>Popularity:</dt>
          <dd>{ popularity }</dd>
        </div>

        <div className='flex'>
          <dt>Reliability:</dt>
          <dd>{ reliability }</dd>
        </div>

        <div  className='flex col-span-2 gap-2'>
          <dt>Tags:</dt>
          <dd>{ tags.map(t => (<span key={ `${id}-${t}` } className='border-box px-1 bg-slate-300 mx-1 rounded-md'>{ t }</span>)) }</dd>
        </div>
      </dl>
    </footer>
  </article>);
}
