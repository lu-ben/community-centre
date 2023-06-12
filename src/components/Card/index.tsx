import { CardProps, ACCOUNT_TYPES, cardButtonTypes } from '../../utils/enum';
import { Button } from '../Button';
import { Tag } from '../Tags';

export const Card = ({
  title,
  date,
  subtitle,
  content,
  tall = true,
  buttonDisabled,
  typeIndex = 1,
  ageRange,
  eventType,
  tags,
  bulletin = false,
  accountType,
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
              />
            </div>
            <div className='grow-0'>
              <Button
                name={
                  buttonDisabled
                    ? cardButtonTypes[typeIndex].disabled
                    : cardButtonTypes[typeIndex].enabled}
                disabled={buttonDisabled}
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
        <div className='col-span-2'>
          <h3 className='text-2xl text-left font-bold'>{title}</h3>
          <p className='text-xs text-left font-bold italic'>{subtitle}</p>
          <p className='text-xs text-left font-semibold'>{date}</p>
          <div className='mt-2'>
            {ageRange && eventType && <p className='text-xs text-left'>{eventType} | {ageRange}</p>}
          </div>
        </div>
        <div className='col-span-2'>
          { content && <p className="pt-2 text-xs text-left col-span-2 overflow-hidden">{content}</p> }
        </div>
        <Button
          name={
            buttonDisabled
              ? cardButtonTypes[typeIndex].disabled
              : cardButtonTypes[typeIndex].enabled}
          disabled={buttonDisabled}
        />
      </div>
    );
