
interface Props {
    id: string;
    name: string;
    imageURL: string;
}

function Carousel({ id, name, imageURL }: Props) {
    return (
        <div key={id} className="image h-[13rem] bg-cover transition duration-700" style={{ backgroundImage: `url('${imageURL}')` }}>
            <div className="image__overlay duration-500 ">
                <h2 className="image__overlay__title">{name}</h2>
                <a type="button" href="/" className="btn btn-dark">Xem thêm</a>
            </div>
        </div>
    )
}

export default Carousel