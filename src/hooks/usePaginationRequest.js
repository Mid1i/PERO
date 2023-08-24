import {useInfiniteQuery} from "react-query";

import {fetchCatalogProducts} from "@api";

export default function usePaginationRequest(isMale, search) {
    const currentPage = (obj) => {
        if (obj.page.content.length === obj.page.size) {
            return obj.page.number + 1;
        } else { 
            return undefined;
        }
    }
    
    const {
        data,
        fetchNextPage,
        isError,
        isFetchingNextPage,
        isLoading
    } = useInfiniteQuery(['items', isMale, search], fetchCatalogProducts, {getNextPageParam: (lastPage) => currentPage(lastPage)})


    return {data, fetchNextPage, isError, isFetchingNextPage, isLoading};
}