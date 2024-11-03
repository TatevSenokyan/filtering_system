
export const Product = ({data}) => {
    return (
        <div data-testid="product">
            <img
               src={data.imageUrl}
            />
            <p>{data.name}</p>
            <p>{data.brand}</p>
            <p>{data.category}</p>
            <p>{"$"} {data.price}</p>
        </div>
    )
} 