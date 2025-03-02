import { useEffect, useState } from 'react';
import { useUnit } from 'effector-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { $user } from '@api/user';

import { Button } from '@ui/button/Button.tsx';
import { FILTER, GUESTS, ANSWERS } from './ProfileAnswers.data.ts';
import triangle from '../../../../public/assets/svg/triangle.svg';
import close from '../../../../public/assets/svg/close.svg';
import { CheckCurrentSection } from '@ui/checkCurrentSection/CheckCurrentSection.tsx';
import styles from './ProfileAnswers.module.scss';
import GuestService from '@api/guest/guest.service.ts';
import { approvalType, Guest, IGuestQueries } from '@api/guest/guest.ts';

import { useInfiniteQuery } from '@tanstack/react-query';
import { IChunk, PaginatedData } from '@api/utils/chunk.ts';
import projectService from '@api/project/project.service.ts';
export function ProfileAnswers() {
  const user = useUnit($user);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const queryParams = searchParams.get('guests');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isActive, setIsActive] = useState<string | null>(queryParams);
  const [isOpenGuests, setIsOpenGuests] = useState<boolean>(false);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [isDisplay, setIsDisplay] = useState<number>();
  const [listGuests, setListGuests] = useState<string[]>([]);
  const [titles, setTitiles] = useState<string[]>([]);
  const buttonClicked = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };
  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Escape') {
      setIsOpenPopup(false);
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     GuestService.getAllByUserId(user.id).then(({ data }) => {
  //       setGuests(data ?? []);
  //     });
  //   }
  // }, [user]);

  useEffect(() => {
    setIsActive(queryParams);
    if (queryParams === 'all') {
      setTitiles(['Имя', 'Статус', 'Количество гостей']);
    } else {
      if (queryParams === null) {
        navigate('/profile/answers?guests=all');
      } else {
        if (queryParams !== 'survey') {
          setTitiles(['Имя', 'Статус', 'Количество гостей']);
        } else {
          setTitiles(Object.keys(ANSWERS[0]));
        }
      }
    }
  }, [queryParams]);

  function getNoun(number: number, one: string, two: string, five: string) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
      return five;
    }
    n %= 10;
    if (n === 1) {
      return one;
    }
    if (n >= 2 && n <= 4) {
      return two;
    }
    return five;
  }

  useEffect(() => {
    const guest: string[] = [];
    setListGuests(guest.concat(listGuests));
    console.log(listGuests);
  }, []);

  async function getAll() {
    const res1 = await GuestService.getAllByProjectId(
      'e3b1233e-6fd0-4a02-8d7d-4ce2f54df08b',
      params,
      guestRequest
    );
    console.log('res1', res1);
    const res2 = await projectService.getQuestionnairesByProjectId(
      'e3b1233e-6fd0-4a02-8d7d-4ce2f54df08b',
      '0ae724c2-37b9-4337-b5bb-cf0a45483e19'
    );
    console.log('res2', res2);
  }
  const [filters, setFilters] = useState('all');
  const {
    data: guestData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
    // isLoading
  } = useInfiniteQuery({
    queryKey: ['answers', filters],
    queryFn:
      user && user?.id
        ? async ({ pageParam = 1 }) => {
            //todo
            // const params: IChunk = {
            //   page: pageParam,
            //   limit: 12
            // };

            //return await GuestService.getAllByUserId(params, user.id);

            
            const filt: approvalType = filters === 'survey' ? 'all' : filters as approvalType;

            const params: IGuestQueries = {
              //todo
              projectId: '0ae724c2-37b9-4337-b5bb-cf0a45483e19',
              approval: filt
            };

            const guestRequest = {
              questionnaireFilters: [
                {
                  questionnaireId: '94fe6f4e-490f-4023-8522-ea91a9aa05bd',
                  answer: ['Рыба']
                }
              ],

              page: pageParam,
              limit: `12`
              // sortBy: 'asc'
              // order?: string,
            };
            return await GuestService.getAllByProjectId(
              'e3b1233e-6fd0-4a02-8d7d-4ce2f54df08b',
              params,
              guestRequest
            );
          }
        : undefined,
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedData<Guest>) => {
      // Проверяем, есть ли еще страницы
      return lastPage.pagination.currentPage < lastPage.pagination.totalPages
        ? lastPage.pagination.currentPage + 1
        : undefined;
    }
  });
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 400 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, isFetchingNextPage]);
  if (guestData) {
    console.log('getAllByUserId', guestData);
  }
  console.log('FILTER', FILTER);
  return (
    <div onKeyDown={handleKeyDown} className={styles.contain}>
      <CheckCurrentSection className={styles.page} sectionName={'profile'}>
        <h3 className={styles.title}>Ответы гостей</h3>
        <button onClick={() => getAll()}>GET</button>
        <button
          onClick={async () => {
            const guest = await GuestService.createByUserId(user!.id!);

            setGuests((prev) => [guest, ...prev]);
            console.log(guest);
          }}>
          CLICK!
        </button>
        <div className={styles.items}>
          {FILTER.map(({ link, title }) => (
            <NavLink
              to={{
                pathname: `/profile/answers`,
                search: `?guests=${link}`
              }}
              key={link}
              onClick={() => setFilters(link)}
              className={`${styles.item} ${isActive === link && styles.itemActive}`}>
              {title}
            </NavLink>
          ))}
        </div>
        <div className={styles.table}>
          <div className={styles.headers}>
            <p className={styles.headersNumber}>№</p>
            {titles.map((title) => (
              <p key={title} className={styles.headersTitle}>
                {title}
              </p>
            ))}
          </div>
          {guestData &&
            guestData.pages
              .flatMap((page: PaginatedData<Guest>) => page.data)
              .map(({ name, status, additional }, id) => (
                <div key={id} className={styles.contentGuests}>
                  <div
                    className={`${styles.content} ${
                      status ? styles.contentTrue : styles.contentFalse
                    }`}>
                    <p className={styles.contentNumber}>{id + 1}</p>
                    <p
                      className={styles.contentText}
                      onLoadCapture={() => {
                        setListGuests(additional);
                      }}>
                      {name}
                    </p>
                    <p className={styles.contentText}>{status ? 'Принято' : 'Отклонено'}</p>
                    <div className={styles.contentAdditionGuests}>
                      <button
                        key={id}
                        className={`${styles.contentAmound} ${
                          additional.length > 1 ? '' : styles.contentNoAmound
                        }`}
                        onClick={() => {
                          if (isDisplay === id) {
                            setIsOpenGuests(!isOpenGuests);
                          } else {
                            setIsOpenGuests(true);
                          }
                          setIsDisplay(id);
                        }}>
                        <div className={styles.contentNumeric}>{additional.length + 1}</div>
                        <img
                          className={`${
                            additional.length > 0
                              ? styles.contentOpenGuests
                              : styles.contentOpenGuestsNo
                          } ${isOpenGuests && isDisplay === id ? styles.contentCloseGuests : ''}`}
                          src={triangle}
                          alt={'открытие списка'}
                        />
                      </button>
                      <button
                        className={styles.contentDelete}
                        onClick={() => {
                          setIsOpenPopup(true);
                          setIsDisplay(id);
                        }}>
                        <img src={close} alt={''} />
                      </button>
                    </div>
                  </div>
                  {additional.map((name, key) => (
                    <div
                      className={`${
                        isOpenGuests && isDisplay === id ? styles.guests : styles.noGuests
                      }`}
                      key={key}>
                      <div className={styles.guestsTitle}>Доп. гость:</div>
                      <div className={styles.guestsText}>
                        <div className={styles.guestsName}>{name}</div>
                        <button
                          className={styles.contentDelete}
                          onClick={() => {
                            setIsOpenPopup(true);
                            setIsDisplay(id);
                          }}>
                          <img src={close} alt={''} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          <div className={styles.bottom}>
            Итого {GUESTS.length} {getNoun(GUESTS.length, 'гость', 'гостя', 'гостей')}
          </div>
        </div>
        <div
          className={`${isOpenPopup ? styles.popup : styles.noPopup}`}
          onClick={() => setIsOpenPopup(false)}>
          <div className={styles.popupContainer} onClick={(e) => buttonClicked(e)}>
            <h4 className={styles.popupTitle}>Удалить гостя?</h4>
            <p className={styles.popupText}>Вы не сможете отменить это действие</p>
            <div className={styles.popupButtons}>
              <Button wide>Да</Button>
              <Button
                wide
                onClick={() => {
                  setIsOpenPopup(false);
                }}>
                Нет
              </Button>
            </div>
          </div>
        </div>
      </CheckCurrentSection>
    </div>
  );
}
