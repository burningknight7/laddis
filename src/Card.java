package src;
public class Card {

  private Suite suite;
  private Denomination value;

  public Card(Suite suite, Denomination value){
    if(suite == null || value == null) {
      throw new IllegalArgumentException("Suite or Denomination can't be Null");
    }
    this.suite = suite;
    this.value = value;
  }

  public Suite getSuite() {
    return this.suite;
  }

  public Denomination getValue() {
    return this.value;
  }

  public boolean equals(Object other) {
    if (!(other instanceof Card)) {
      return false;
    }
    Card o = (Card) other;
    return this.suite == o.suite && this.value == o.value;
  }

  public int hashCode() {

    return this.suite.getVal() * 100 + this.value.getVal();

  }

}
