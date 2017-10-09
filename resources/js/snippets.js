Array.prototype.insert = function (index, item)
{
  this.splice(index, 0, item);
};

Array.prototype.remove = function (index)
{
    this.splice(index, 1);
}

Array.prototype.copy = function()
{
    var newArray = [];

    for (var i = 0; i < this.length; i++)
    newArray[i] = this[i].slice();

    return newArray;
}
