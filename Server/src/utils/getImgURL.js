const getImgURL = (name) => {
  const urlName = name.replace(' ', '+');
  return 'https://ui-avatars.com/api/?name=' + urlName;
}

export default getImgURL