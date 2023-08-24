import {useQuery} from "react-query";


export default function useRequest(func, keys = ['items'], options = {retry: false}) {
    const {
        data,
        isError,
        isLoading
    } = useQuery(keys, func, options);

    return {data, isError, isLoading};
}