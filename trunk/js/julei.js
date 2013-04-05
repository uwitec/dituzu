Array.prototype.remove = function(index){
	if(index < 0 && index >= this.length)
		return this;
	return this.slice(0, index).concat(this.slice(index+1, this.length));
}

function Item(x, y){
	this.x = x;
	this.y = y;
}

Item.prototype.distanceTo = function(item){
	return Math.sqrt(Math.pow(this.x - item.x, 2) + Math.pow(this.y - item.y, 2));
}

function Group(){
	this.list = new Array();
}

Group.prototype.add = function(group){
	this.list = this.list.concat(group.list);
}

var data = new Array();
var groups;
var dist;

var item1 = new Item(1.0, 1.0);
var item2 = new Item(1.1, 1.1);
var item3 = new Item(-1.0, -1.0);
var item4 = new Item(-1.1, -1.1);
var item5 = new Item(0, 0);

data.push(item1);
data.push(item2);
data.push(item3);
data.push(item4);
data.push(item5);

function analysis(data, T){
	var i, j;
	dist = new Array(data.length);
	groups = new Array(data.length);
	for(i = 0; i < data.length; i++){
		dist[i] = new Array(i);
		groups[i] = new Group();
		groups[i].list.push(i);
	}

	for (i = 1; i < dist.length; i++)
		for(var j = 0; j < i; j++){
			dist[i][j] = data[i].distanceTo(data[j]);
		}

	var min, from, to;
	while(true){
		min = Number.POSITIVE_INFINITY;
		if(dist.length <= 1) break;
		for(i = 1; i < dist.length; i++){
			for(j = 0; j < i; j++){
				if(dist[i][j] < min){
					min = dist[i][j];
					from = i;
					to = j;
				}
			}
		}
		if(min > T) break;
		for(j = 0; j < to; j++){
			dist[to][j] = Math.min(dist[from][j], dist[to][j]);
		}
		for(j = to + 1; j < from; j++){
			dist[j][to] = Math.min(dist[from][j], dist[j][to]);
		}
		for(i = from + 1; i < dist.length; i++){
			dist[i][to] = Math.min(dist[i][to], dist[i][from]);
			dist[i] = dist[i].remove(from);
		}

		dist = dist.remove(from);

		
		groups[to].add(groups[from]);
		groups = groups.remove(from);
	}
}

analysis(data, 1.4);