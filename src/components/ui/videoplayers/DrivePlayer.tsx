const GDrivePlayer = ({ link }: { link: string }) => {
  return (
    <div className='w-full aspect-video'>
      <iframe
        src={`https://drive.google.com/file/d/${link}/preview`}
        width='100%'
        height='100%'
        allow='autoplay'
      ></iframe>
    </div>
  );
};

export default GDrivePlayer;
