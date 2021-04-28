package src;
public enum Denomination {

  ACE(0),
  TWO(1),
  THREE(2),
  FOUR(3),
  FIVE(4),
  SIX(5),
  SEVEN(6),
  EIGHT(7),
  NINE(8),
  TEN(9),
  JACK(10),
  QUEEN(11),
  KING(12),
  JOKER(13)

  private int val;

  Suite(val) {
    this.val = val;
  }

  public getVal() {
    return this.val;
  }

}
