package src;
import java.util.Random;

public class StandardDeck implements Deck {

  private List<Card> cards;

  public class StandardDeck(){

    cards = new LinkedList<Card>();

    for(Suite s : Suite.valeues()){
      if(s != Suite.BLANK){
        for(Denomination v : Denomination.values()) {
          if(v != Denomination.JOKER){
            cards.addLast(new Card(s,v));
          }
        }
      }
    }

    cards.addLast(new Card(Suite.BLANK,Denomination.JOKER));
    cards.addLast(new Card(Suite.BLANK,Denomination.JOKER));
  }

  public void shuffle() {
    List<Card> shuffledCards = new LinkedList<>();
    Random rnd = new Random(0);
    while(!cards.isEmpty()){
      shuffledCards.addLast(cards.remove(rnd.nextInt()));
    }
    this.cards = shuffledCards;
  }

  public Card drawCard() {
    return this.cards.removeLast();
  }

  public Card drawCardFrom(int index) {
    if(index < 0 || index >= this.cards.size()) {
      throw new IllegalArgumentException("index out of bounds");
    }
    return this.cards.remove(index);
  }

  public void putCard(Card card) {
    if(card == null) {
      throw new IllegalArgumentException("Null Card");
    }
    this.cards.addLast(card);
  }

  public void putCardAt(int index, Card card) {
    if(card == null) {
      throw new IllegalArgumentException("Null Card");
    }
    if(index < 0 || index >= this.cards.size()) {
      throw new IllegalArgumentException("Index out of bounds");
    }
    this.cards.add(index,card);
  }

  public void sort() {

  }

  public void sort(Comparator<Card> comparator) {
    Collections.sort()
  }

}
