import { XMarkIcon } from "@heroicons/react/24/solid";

function OrderCard(props) {
    // eslint-disable-next-line react/prop-types
    const { id, title, imageUrl, price, handleDelete } = props;
    let renderXmarkIcon;
    if (handleDelete) {
        renderXmarkIcon = <XMarkIcon className="h-6 w-6 text-black cursor-pointer" onClick={() => handleDelete(id)}/>
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 justify-between items-center mb-3 p-3 shadow-md rounded-lg">
            <div className="justify-self-center">
                <figure className="rounded-lg">
                    <img className="h-24 md:h-32" src={imageUrl} alt={title} />
                </figure>
            </div> 
            <div className="flex flex-col items-start p-3 w-full">
                <p className="text-xs font-normal">{title}</p>
                <span className="text-lg font-medium">${price}</span>
                { renderXmarkIcon }
            </div>
        </div>
    )
}

export default OrderCard;