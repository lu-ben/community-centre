import { CardProps, ACCOUNT_TYPES, cardButtonTypes } from '../../utils/enum';
import { Button } from '../Button';
import { Tag } from '../Tags';

export const Card = ({
  title,
  date,
  subtitle,
  content,
  tall = true,
  disabled,
  typeIndex = 1,
  age,
  type,
  tags,
  bulletin = false,
  accountType,
  id,
  onClick = () => '',
  deleteOnClick = () => '',
}: CardProps) =>
  tall
    ? (
      <div className='bg-light-blue rounded-xl px-6 py-4 min-w-card max-h-card w-full mb-4'>
        {bulletin && accountType === ACCOUNT_TYPES.EMPLOYEE ? (
          <div className='flex'>
            <div className='grow'>
              <h3 className='text-2xl text-left font-bold'>{title}</h3>
              <p className='text-xs text-left italic'>{subtitle}</p>
              <p className='text-xs text-left font-semibold'>{date}</p>
            </div>
            <div className='grow-0'>
              <Button
                name="Delete"
                color='bg-light-blue'
                onClick={() => deleteOnClick(id)}
              />
            </div>
            <div className='grow-0'>
              <Button
                name={
                  disabled
                    ? cardButtonTypes[typeIndex].disabled
                    : cardButtonTypes[typeIndex].enabled}
                disabled={disabled}
                onClick={() => onClick(id)}
              />
            </div>
          </div>
        )
          :
          (
            <>
              <h3 className='text-2xl text-left font-bold'>{title}</h3>
              <p className='text-xs text-left italic'>{subtitle}</p>
              <p className='text-xs text-left font-semibold'>{date}</p>
            </>
          )
        }
        { <div className="flex gap-1 mt-2">{tags && tags.map((item: string, index: number) => <Tag label={item} key={index}/>)}</div>}
        { content && <p className="pt-6 pb-2 text-xs text-left">{content}</p> }
      </div>
    ) : (
      <div className='bg-light-blue rounded-xl px-6 py-4 min-w-card max-h-card w-full mb-4 grid grid-cols-5'>
        <div className={`${content ? 'col-span-2' : 'col-span-4'}`}>
          <h3 className='text-2xl text-left font-bold'>{title}</h3>
          <p className='text-xs text-left font-bold italic'>{subtitle}</p>
          <p className='text-xs text-left font-semibold'>{date}</p>
          <div className='mt-2'>
            {age && type && <p className='text-xs text-left'>{type.toUpperCase()} | {age === 'all' ? `${age.toUpperCase()} AGES` : age.toUpperCase()}</p>}
          </div>
        </div>
        {content && (
          <div className='col-span-2'>
            <p className="pt-2 text-xs text-left overflow-hidden">{content}</p>
          </div>)}
        <Button
          name={
            disabled
              ? cardButtonTypes[typeIndex].disabled
              : cardButtonTypes[typeIndex].enabled}
          disabled={disabled}
          onClick={()=> onClick(id)}
        />
      </div>
    );
