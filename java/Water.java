
public class Water extends Entity implements IEntity {
	protected Water(int x, int y) {
		this.x = x;
		this.y = y;
	}
	
	public Boolean think() {
		//System.out.print("Water\n");
		return (true);
	}
}
