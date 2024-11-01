import { useEffect } from "react";

export const useScrollPagination = (ref, loadMore) => {
    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = ref.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                loadMore();
            }
        };

        if (ref.current) ref.current.addEventListener("scroll", handleScroll);

        return () => ref.current && ref.current.removeEventListener("scroll", handleScroll);
        
    }, [ref, loadMore]);
};