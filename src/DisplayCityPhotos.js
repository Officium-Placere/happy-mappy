
function GetCityInfo({ photos }) {

    let showPics = true;

    const handlePics = () => {
        showPics = !showPics
        console.log(showPics)
    }

    return (
        <section>
            {DisplayCityPhotos.length === 0 ? (
                null
            ) : (
                <div>
                    <button onClick={() => handlePics()} >Click for city photos</button>
                    {/* doesn't display city photo on click, the code runs with showPics valued as false, so null runs immediately.. might need to put the photo in a new component and then display it based on boolean value.. or look into a better way of doing this! */}
                    { showPics === true ? photos.map((photo) => {
                            return (
                                <div key={photo.id}>
                                    <img src={photo.urls.small} alt={photo.alt_description} />
                                </div>
                            );
                        })
                        : null
                    }
                </div>
            )}
        </section>
    )
}

export default GetCityInfo;