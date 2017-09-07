
public class Worker extends Entity implements IEntity {
	private Map map;
	private int side;
	
	protected Worker(Map m, int s, int x, int y) {
		this.map = m;
		this.side = s;
		this.x = x;
		this.y = y;
	}
	
	
	public Boolean think() {
		for(Object i : map.entity) {
			if(i instanceof Food) {
				Food f = (Food)i;
				nextPos(1, f.x, f.y);
				break;
			}
			
			if(i instanceof Water) {
				Water w = (Water)i;
				nextPos(1, w.x, w.y);
				break;
			}
		}
		return (true);
	}
}
