
public class Entity {
	public int x;
	public int y;
	
	public void nextPos(int speed, int ax, int ay) {
		double angle = (Math.atan2(ay - this.y, ax - this.x) * 180) / Math.PI;
		
		this.x = (int)Math.max(0, Math.min(63, this.x + Math.round(speed * Math.cos(angle))));
		this.y = (int)Math.max(0, Math.min(63, this.y + Math.round(speed * Math.sin(angle))));
	}
	
	public Boolean think() {
		return (true);
	}
	
	public void draw() {
		
	}
}
