import preloader from "../../../assets/Images/preloaderIcon.gif"

let Preloader = (props) => {
    return <div style={{ width: '200px' }}>
        <img src={preloader} />
    </div>
}

export default Preloader;