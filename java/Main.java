//  javac $(find . | grep .java) && java Main

import java.util.Arrays;
import java.lang.Thread;

public class Main extends Base {
	public static Map map = new Map();
	public static Boolean run;
	
	public static void main(String args[]) {
		CliParser parser = new CliParser(args);
		run = true;
		log.write("log/setup", "start arguments are " + Arrays.toString(parser.argument()));

		try {
			map.startup();
			log.write("log/game", "simulation starts");
			
			while (run) {
				boolean skip = map.think();
				if (!skip) {
					System.out.print("\033c");
					run = map.draw();
					Thread.sleep(50);
				}
			}
		} catch (Exception e) {
			System.out.println(e);
		}

		log.write("log/game", "simulation is finished").close();
	}
}
