
import java.util.Arrays;

public class CliParser {
	private String[] _argument;
	
	public CliParser(String args[]) {
		int n = args.length;
		this._argument = new String[args.length];
		System.arraycopy(args, 0, this._argument, 0, n);
	}
	
	public String[] argument() {
        return (this._argument);
	}
}
