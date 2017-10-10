Array.prototype.insert = function (index, item)
{
  this.splice(index, 0, item);
};

Array.prototype.remove = function (index)
{
    this.splice(index, 1);
};

Array.prototype.copy = function()
{
    var newArray = [];

    for (var i = 0; i < this.length; i++)
    newArray[i] = this[i].slice();

    return newArray;
};

Array.prototype.removeDuplicates = function()
{
    var uniqueArray = this.filter(function(item, pos)
    {
        return this.indexOf(item) == pos;
    });

    return uniqueArray;
};

Array.prototype.sortNumbers = function(ascending = true)
{
    if (ascending)
        this.sort(function(a, b){return a-b});
    else
        this.sort(function(a, b){return b-a});
};
