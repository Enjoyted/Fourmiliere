
public class Entity extends Base {
	public float x;
	public float y;
	
	public void nextPos(int speed, float ax, float ay) {
		double angle = Math.atan2(ay - this.y, ax - this.x);
		
		this.x = (float)Math.max(0, Math.min(63, this.x + (speed * Math.cos(angle))));
		this.y = (float)Math.max(0, Math.min(63, this.y + (speed * Math.sin(angle))));
	}
	
	public Boolean think() {
		return (true);
	}
	
	public void draw() {
		
	}
}
