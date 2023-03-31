import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backend_URL } from "../BACKEND_URL";
import "./characters.css";

export default function Characters() {
  // const [words, setWords] = useState({});
  const [hiraganaBasic, setHiraganaBasic] = useState([]);
  const [hiraganaDakuon, setHiraganaDakuon] = useState([]);
  const [katakanaBasic, setKatakanaBasic] = useState([]);
  const [katakanaDakuon, setKatakanaDakuon] = useState([]);

  useEffect(() => {
    const getWords = async () => {
      try {
        const hiragana_basic = await axios.get(
          `${Backend_URL}/words/hiraganaBasic`
        );
        setHiraganaBasic(hiragana_basic);
        const hiragana_dakuon = await axios.get(
          `${Backend_URL}/words/hiraganaDakuon`
        );
        setHiraganaDakuon(hiragana_dakuon);
        const katakana_basic = await axios.get(
          `${Backend_URL}/words/katakanaBasic`
        );
        setKatakanaBasic(katakana_basic);
        const katakana_dakuon = await axios.get(
          `${Backend_URL}/words/katakanaDakuon`
        );
        setKatakanaDakuon(katakana_dakuon);
      } catch (error) {
        console.log("error", error);
      }
    };
    getWords();
  }, []);

  const hiraganaBasicsData = hiraganaBasic.data;
  const hiraganaDakuonData = hiraganaDakuon.data;
  const katakanaBasicsData = katakanaBasic.data;
  const katakanaDakuonData = katakanaDakuon.data;

  // useEffect(() => {
  //   if (hiraganaBasicsData !== undefined && hiraganaDakuonData !== undefined) {
  //     hiraganaBasicsData.map((i) => {
  //       return console.log("hiragana basic", i);
  //     });
  //     hiraganaDakuonData.map((i) => {
  //       return console.log("hiragana dakuon", i);
  //     });
  //   }
  // });

  return (
    <div className="character-section">
      <div className="character-container">
        <h1>Hiragana Basic</h1>
        <div className="hirgana-basic-grid">
          {hiraganaBasicsData &&
            hiraganaBasicsData.map((i) => (
              <div className="character-wrapper" key={i.id}>
                <div className="character">{i.character}</div>
                <div className="character-lower-wrapper">
                  <div className="pronounciation">{i.pronounciation}</div>
                </div>
              </div>
            ))}
        </div>
        <h1>Hiragana Dakuon</h1>
        <div className="hirgana-basic-grid">
          {hiraganaDakuonData &&
            hiraganaDakuonData.map((i) => (
              <div className="character-wrapper" key={i.id}>
                <div className="character">{i.character}</div>
                <div className="character-lower-wrapper">
                  <div className="pronounciation">{i.pronounciation}</div>
                </div>
              </div>
            ))}
        </div>
        <h1>Katakana Basic</h1>
        <div className="hirgana-basic-grid">
          {katakanaBasicsData &&
            katakanaBasicsData.map((i) => (
              <div className="character-wrapper" key={i.id}>
                <div className="character">{i.character}</div>
                <div className="character-lower-wrapper">
                  <div className="pronounciation">{i.pronounciation}</div>
                </div>
              </div>
            ))}
        </div>
        <h1>Katakana Dakuon</h1>
        <div className="hirgana-basic-grid">
          {katakanaDakuonData &&
            katakanaDakuonData.map((i) => (
              <div className="character-wrapper" key={i.id}>
                <div className="character">{i.character}</div>
                <div className="character-lower-wrapper">
                  <div className="pronounciation">{i.pronounciation}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
