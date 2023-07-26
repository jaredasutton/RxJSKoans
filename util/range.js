export const Range = {
  create: function (start, end) {
    const direction = start < end ? 1 : -1;
    return new Array(end - start + 1)
      .fill(null)
      .map(
        (_,i)=>(start + (direction*i))
      );
  }
};
