// concatene des array en une seul array
/**
 *  var a = [
    {
      id: 1,
      contenu: [
        { id: 14, qqt: 20 },
        { id: 12, qtt: 10 },
      ],
    },
    { id: 2, contenu: [{ id: 12, qqt: 2 }] },
  ];
* deviens var b=[{ id: 14, qqt: 20 },{ id: 12, qtt: 10 },{ id: 12, qqt: 2 }]
 * 
 */
const flatify = (data, attribute) => {
  return [...new Set([].concat(...data.map((o) => o[attribute])))];
};
export default flatify;