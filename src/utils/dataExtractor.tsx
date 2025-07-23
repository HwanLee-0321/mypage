type Props = {
  name: string;
};

export const getData = (fileName: string) => {
  try {
    // 필요에 따라 정적 데이터 가져오기
    return require(`../assets/static/${fileName}.json`);
  } catch (error) {
    console.log(`Data with name "${fileName}" does not exist`);
    return null;
  }
};
