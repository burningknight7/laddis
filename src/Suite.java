package src;
public enum Suite {

  SPADE(0),
  CLUB(1),
  HEART(2),
  DIAMOND(3),
  BLANK(4);

  private int val;

  Suite(int val) {
    this.val = val;
  }

  public int getVal() {
    return this.val;
  }

}
