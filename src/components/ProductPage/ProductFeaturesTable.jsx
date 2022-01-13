export const ProductFeaturesTable = ({ ...features }) => {
  const productFeatures = [
    ['sku', 'Артикул'],
    ['manufacturer', 'Производитель'],
    ['color', 'Цвет'],
    ['material', 'Материалы'],
    ['season', 'Сезон'],
    ['reason', 'Повод'],
    ['heelSize', 'Высота каблука/подошвы'],
  ];

  return (
    <table className="table table-bordered">
      <tbody>
        {productFeatures.reduce((acc, feature) => {
          const [propName, title] = feature;
          if (features[propName]) {
            acc.push(
              <tr key={propName}>
                <td>{title}</td>
                <td>{features[propName]}</td>
              </tr>,
            );
          }
          return acc;
        }, [])}
      </tbody>
    </table>
  );
};
