
public class Food extends Entity implements IEntity {
	protected Food(int x, int y) {
		this.x = x;
		this.y = y;
	}
	
	public Boolean think() {
		//System.out.print("Food\n");
		return (true);
	}
}
