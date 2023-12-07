function Tooltip({ content }) {
    return (
        <div className="absolute -top-[7.5rem] z-[100] bg-blue-500 rounded-2xl flex py-2 p-3 w-full">
            <div>{content}</div>
        </div>
    )
}

export default Tooltip
