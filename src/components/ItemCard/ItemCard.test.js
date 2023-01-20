import React from 'react';
import ItemCard from './ItemCard';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const data = {
    kategoria: "Haalarit",
    nimike: "Testihaalarit",
    koko: "116",
    vari: "#000000",
    kausi: "Talvi",
    huomioita: "Rikki polvista"
};

const makeSut = () => {
    return render(
        <BrowserRouter>
            <ItemCard id='item'
                data={data}
            />
        </BrowserRouter>
    );
};

describe("<ItemCard />", () => {
    /*test("Should not render element with class 'itemcard__link' on initial render", () => {
        const { container } = makeSut();

        expect(container.querySelector(".itemcard__link")).not.toBeVisible();
    });*/

    test("Should render element with class 'itemcard__link' when hovering", () => {
        const { container, queryByTestId } = makeSut();

        userEvent.hover(container);
        expect(container.querySelector(".itemcard__link")).toBeVisible();
        /*userEvent.unhover(container);
        expect(container.querySelector(".itemcard__link")).not.toBeVisible();*/
    });

    /*
      test("Should switch button label on click", () => {
        const { getByText } = makeSut({});
    
        expect(getByText(labels.show)).toBeInTheDocument();
    
        fireEvent.click(getByText(labels.show));
    
        expect(getByText(labels.hide)).toBeInTheDocument();
      });
    
      test("Should render 3 li correctly", () => {
        const { getByText, container } = makeSut({});
    
        fireEvent.click(getByText(labels.show));
    
        expect(container.querySelectorAll("li").length).toBe(data.length);
      });
    
      test("Should call onRemoveItem callback correctly", () => {
        const onRemoveItem = jest.fn();
    
        const { getByText, getAllByText } = makeSut({ onRemoveItem });
    
        fireEvent.click(getByText(labels.show));
    
        fireEvent.click(getAllByText(/Remove/)[2]);
    
        expect(onRemoveItem).toHaveBeenCalledWith(data[2], 2);
      });*/
});