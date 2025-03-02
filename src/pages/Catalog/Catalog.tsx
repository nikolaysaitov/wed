import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUnit } from 'effector-react';

import { $user, dislikeCard$, likeCard$ } from '@api/user/user.store.ts';
import { useCurrentView } from '@context/current-view/CurrentViewContext.ts';
import { CardList } from '@ui/cardsList/CardsList.tsx';
import { Layout } from '@ui/layout/Layout.tsx';
import { CheckCurrentSection } from '@ui/checkCurrentSection/CheckCurrentSection.tsx';
import { CatalogNavigation } from './CatalogNav/CatalogNavigation.tsx';
import filter from '@assets/svg/filter.svg';
import triangle from '@assets/svg/triangle.svg';
import { CATALOG, FILTER, FilterOption } from './Catalog.data.ts';
import styles from './Catalog.module.scss';
import TemplateService from '@api/templates/template.service.ts';
import { ITemplate, PaginatedTemplate } from '@api/templates/template.ts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IChunk } from '@api/utils/chunk.ts';

export function Catalog() {
  const user = useUnit($user);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParams = searchParams.get('category');
  const [counter, setCounter] = useState(6);
  const [, setIsLoading] = useState<boolean>(false);
  const [isActive] = useState<string | null>(queryParams);
  const [templates] = useState<ITemplate[]>([]);
  const [likedCards, setLikedCards] = useState<string[]>([]);
  const [isSelection, setIsSelection] = useState(false);
  const { mediaView } = useCurrentView();

  function handleLikeCard(id: string, like: boolean) {
    if (user) {
      if (like) {
        likeCard$({ cardId: id, userId: user.id }).then(() => {});
      } else {
        dislikeCard$({ cardId: id, userId: user.id }).then(() => {});
      }
    } else {
      console.log('не авторизован, отдать попап с авторизацией');
    }
  }

  useEffect(() => {
    if (user) {
      setLikedCards(user.likedTemplates);
    }
  }, [user]);

  const [filterArr, setFilterArr] = useState<FilterOption[]>([]);

  const toggleStringInArray = (newString: FilterOption) => {
    setFilterArr((prev): FilterOption[] => {
      if (newString === 'all') {
        return ['all'];
      }
      const filteredArr = prev.filter((str) => str !== 'all');

      if (filteredArr.includes(newString)) {
        return filteredArr.filter((str) => str !== newString);
      } else {
        return [...filteredArr, newString];
      }
    });
  };

  function showMoreTemplates({ currentTarget }: React.UIEvent<HTMLElement>) {
    const bottom =
      Number(
        (currentTarget.scrollHeight - currentTarget.scrollTop).toFixed(0)
      ) -
        currentTarget.clientHeight <
      250;
    const loading =
      Number(
        (currentTarget.scrollHeight - currentTarget.scrollTop).toFixed(0)
      ) -
        currentTarget.clientHeight <
      450;

    if (counter <= templates.length) {
      if (loading) {
        setIsLoading(true);
      }
      if (bottom) {
        setCounter(counter + 6);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }

  function selectionVisible() {
    setIsSelection((value) => !value);
  }

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingQuery
  } = useInfiniteQuery({
    queryKey: ['cards', filterArr],
    queryFn: async ({ pageParam = 1 }) => {
      const params: IChunk = {
        ...(filterArr.length > 0 &&
          queryParams &&
          queryParams !== 'all' && { filters: filterArr.join(',') }),
        page: pageParam,
        limit: 6
      };

      return await TemplateService.getAllTemplates(params);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedTemplate) => {
      // Проверяем, есть ли еще страницы
      return lastPage.pagination.currentPage < lastPage.pagination.totalPages
        ? lastPage.pagination.currentPage + 1
        : undefined;
    }
  });

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 400 &&
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

  return (
    <CheckCurrentSection sectionName={'catalog'}>
      <Layout onScroll={showMoreTemplates}>
        <div className={styles.contain}>
          {mediaView === 'mobile' && <h3 className={styles.title}>Каталог</h3>}
          <CatalogNavigation
            filterArr={filterArr}
            isActive={isActive}
            toggleStringInArray={toggleStringInArray}
          />

          <div className={styles.content}>
            <div className={styles.filter}>
              {FILTER.map(({ link, title }) => (
                <NavLink
                  onClick={() => {
                    toggleStringInArray(link as FilterOption);
                  }}
                  to={{
                    pathname: `/catalog`,
                    search: `?category=${link}`
                  }}
                  key={link}
                  style={{
                    fontWeight:
                      filterArr.length > 0 &&
                      filterArr.includes(link as FilterOption)
                        ? '700'
                        : '300'
                  }}
                  className={styles.filterButton}
                >
                  {title}
                </NavLink>
              ))}
            </div>

            {mediaView === 'mobile' && (
              <div className={styles.select}>
                <button
                  className={styles.selectWindow}
                  onClick={selectionVisible}
                >
                  <div className={styles.union}>
                    <img
                      src={filter}
                      className={styles.selectFilter}
                      alt={''}
                    />
                    <p className={styles.selectTitle}>Выбрать стиль</p>
                  </div>

                  <img
                    src={triangle}
                    className={`${styles.selectTriangle} ${
                      isSelection && styles.selectTriangleRotate
                    }`}
                    alt={''}
                  />
                </button>

                <div
                  className={`${styles.options} ${
                    isSelection && styles.optionsVisible
                  }`}
                >
                  {CATALOG.map(({ link, title }) => (
                    <NavLink
                      onClick={() => toggleStringInArray(link as FilterOption)}
                      to={{
                        pathname: `/catalog`,
                        search: `?category=${link}`
                      }}
                      className={styles.option}
                      key={link}
                      style={{
                        fontWeight:
                          filterArr.length > 0 &&
                          filterArr.includes(link as FilterOption)
                            ? '700'
                            : '300'
                      }}
                    >
                      {title}
                    </NavLink>
                  ))}
                </div>
              </div>
            )}

            <CardList
              cards={
                data?.pages.flatMap((page: PaginatedTemplate) => page.data) ||
                []
              }
              likedCards={likedCards}
              buttonLast="Редактировать"
              buttonFirst="Демо-версия"
              buttonLike={true}
              buttonDelete={false}
              buttonFirstNone={false}
              handleLikeCard={handleLikeCard}
              counter={counter}
              isLoading={isLoadingQuery}
            />
          </div>
        </div>
      </Layout>
    </CheckCurrentSection>
  );
}
