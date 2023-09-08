import {useQuery} from "react-query";


export default function useRequest(func, keys = ['items'], options = {retry: false}) {
    const {
        data,
        error,
        isError,
        isLoading
    } = useQuery(keys, func, options);

    return {data, error, isError, isLoading};
}