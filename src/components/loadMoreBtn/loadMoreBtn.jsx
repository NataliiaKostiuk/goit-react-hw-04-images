import { Button } from './loadMoreBtn.styled';
export const LoadMoreBtn = ({onClick}) => {
    return (
        <Button type="button" onClick={onClick}>Load more</Button>
    )
}